const assert = require('assert');
const should = require('should');
const testServer = require('../../testServer');
const util_file = require('../../lib/file');

describe('util_sms', function() {

  this.timeout(6000);

  describe('#signatureUrl()', function() {

    it('should return object when params provided', async () => {
      // const result = util_file.signatureUrl('8270cc99459e99cc126e816ccdb9d9da.png');
      const result = await util_file.signatureUrl('/file/file.js');
      console.log(result);
    });
  });

  describe('#getObjects()', function() {

    it('should return object when params provided', async () => {
      const result = await util_file.getObjects('admin');
      console.log(result);
    });
  });

  describe('#copyObjectFromPrivateToStatic()', function() {

    it('should return object when params provided', async () => {
      const result = await util_file.copyObjectFromPrivateToStatic('matchGif/6067/2/1296.gif');
      console.log(result);
    });
  });


});
