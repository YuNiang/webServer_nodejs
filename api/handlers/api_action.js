'use strict';
const Joi = require('joi');
const Boom = require('boom');
const serviceTeamInfo = require('../../service/api_team_info');
const moment = require("moment");

/**
 * roleid
 1 超级管理员
 3 教练员
 */

/**
 * 更新首发名单以及红蓝方信息
 */
module.exports.update_first = {
  auth: 'jwt',
  validate: {
    payload: {
      teamId: Joi.number().integer().required(),
      matchId: Joi.number().integer().required(),
      bo: Joi.number().integer().required(),
      top: Joi.number().integer().required(),
      jug: Joi.number().integer().required(),
      mid: Joi.number().integer().required(),
      adc: Joi.number().integer().required(),
      sup: Joi.number().integer().required(),
      coach: Joi.number().integer(),
      subCoach: Joi.number().integer(),
      side: Joi.string().valid(["blue", "red"]).required(),
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    const {teamId, matchId, bo, top, jug, mid, adc, sup, coach, subCoach, side} = request.payload;
    const DB = request.getDb(process.env.DB_DBNAME);
    const TeamFirst = DB.getModel('tb_team_first');
    const AdminUser = DB.getModel('admin_user');
    const ActionLog = DB.getModel("tb_action_log");
    const AdminInfo = DB.getModel('tb_admin_info');
    const TeamFirstDefault = DB.getModel("tb_team_first_default");
    const session = request.auth.credentials;
    try {
      const uinfo = await AdminInfo.findOne({where: {sOpenId: session.username}, raw: true});
      if (!uinfo) {
        throw new Error("您的登录信息已过期，请重新登录");
      }
      if (uinfo.iRoleId != 3) {
        throw new Error("您没有权限更新首发名单");
      }
      if (uinfo.iTeamId != teamId) {
        throw new Error("您没有权限更新首发名单");
      }
      const admin = await AdminUser.findOne({where: {username: uinfo.sUnionid}, raw: true});
      if (!admin) {
        throw new Error("您没有权限更新首发名单");
      }

      const matchDetail = await TeamFirst.findOne({where: {iMatchId: matchId, iTeamId: teamId, iBo: bo}})
      if (!matchDetail) {
        throw new Error("赛程不存在,请联系生态管理员！");
      }

      if (new Date(matchDetail.dtAbortTime).getTime() < Date.now()) {
        throw new Error("当前时间不可更改首发名单");
      }
      const teaminfo = await serviceTeamInfo.getTeamInfo(request.server, teamId);
      if (!teaminfo) {
        throw new Error("队伍信息不存在");
      }
      if (coach == 0) {
        throw new Error("主教练不能为空！");
      }
      if (subCoach == -1) {
        throw new Error("辅助教练不能设置为临时教练！");
      }
      // if (coach == -1 && (subCoach != 0 || subCoach != -2)) {
      //   throw new Error("当主教练为临时教练时，辅助教练不可设置");
      // }

      const firstInfo = {
        iBo: bo,
        iMatchId: matchId,
        iTeamId: teamId,
        sTeamName: teaminfo.TeamDes,
        iJug: jug,
        iTop: top,
        iMid: mid,
        iAdc: adc,
        iSup: sup,
        iCoach: coach,
        iSubCoach: subCoach,
        sModifyBy: "coach",
        sModifyName: admin.idname,
        dtUpdateTime: moment().format("YYYY-MM-DD HH:mm:ss")
      };

      if (matchDetail.iFirstChoose == teamId) {
        firstInfo["sSide"] = side;
        //被动更新对方的选边
        let otherSide = "red";
        if (firstInfo.sSide == "red") {
          otherSide = "blue";
        }
        let sql = `update tb_team_first set sSide = "${otherSide}" where iMatchId = ${matchId} and iBo = ${bo} and iTeamId != ${teamId}`;
        await global.Sequelize.query(sql);
      }
      await TeamFirst.update(firstInfo, {where: {iBo: bo, iMatchId: matchId, iTeamId: teamId}});

      await ActionLog.create({
        iUserId: uinfo.id,
        sUserName: admin.idname,
        sContent: JSON.stringify(request.payload),
        UpdatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        sAction: "updateFirst"
      })
      const [data, created1] = await TeamFirstDefault.findOrCreate({
        where: {iTeamId: teamId},
        defaults: {
          iTeamId: teamId,
          sTeamName: teaminfo.TeamDes,
          iJug: jug,
          iTop: top,
          iMid: mid,
          iAdc: adc,
          iSup: sup,
          iCoach: coach,
          iSubCoach:subCoach,
          dtUpdateTime: moment().format("YYYY-MM-DD HH:mm:ss")
        }
      });
      if (!created1) {
        await TeamFirstDefault.update({
          iTeamId: teamId,
          sTeamName: teaminfo.TeamDes,
          iJug: jug,
          iTop: top,
          iMid: mid,
          iAdc: adc,
          iSup: sup,
          iCoach: coach,
          iSubCoach:subCoach,
          dtUpdateTime: moment().format("YYYY-MM-DD HH:mm:ss")
        }, {where: {iTeamId: teamId}});
      }
      reply(matchDetail);
    } catch (err) {
      console.log(err);
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      reply(err);
    }
  }
}
