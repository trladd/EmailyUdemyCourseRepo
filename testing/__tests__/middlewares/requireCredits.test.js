const requireCredits = require('../../../middlewares/requireCredits');

const mockReq = require('../../testUtils/mockRequest');
const mockRes = require('../../testUtils/mockResponse');

describe('check credits', ()=>{
    test('should be 403 if user does not have enough credits', async ()=>{
        var req = mockReq();
        const res = mockRes();
        const next = jest.fn();
        await requireCredits(req,res,next);
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalledWith({error: 'Not enough credits'});
        expect(next).not.toHaveBeenCalled();
    });
    test('should call next if credits is greater than zero', async ()=>{
        var req = mockReq();
        req.user.credits = 1;
        const res = mockRes();
        const next = jest.fn();
        await requireCredits(req,res, next);
        expect(next).toHaveBeenCalled();
    });
});