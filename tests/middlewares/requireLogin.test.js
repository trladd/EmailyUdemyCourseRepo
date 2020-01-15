const requireLogin = require('../../middlewares/requireLogin');

const mockReq = require('../testUtils/mockRequest');
const mockRes = require('../testUtils/mockResponse');

describe('check logged in middleware', ()=>{
    test('should be 401 if check credits is not set', async ()=>{
        const req= {};
        const res = mockRes();
        const next = jest.fn();
        await requireLogin(req,res,next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(next).not.toHaveBeenCalled();
    });
    test('should call next if logged in (user object exists)', async ()=>{
        var req = mockReq();
        req.user.credits = 1;
        const res = mockRes();
        const next = jest.fn();
        await requireLogin(req,res, next);
        expect(next).toHaveBeenCalled();
    });
});