const authService = require('../services/account.service');

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ 
                success: false, 
                errorCode: "VALIDATION_ERROR",
                message: "Vui lòng nhập tài khoản và mật khẩu" 
            });
        }

        const account = await authService.login(username, password);

        if (!account) {
            return res.status(401).json({ 
                success: false, 
                errorCode: "UNAUTHORIZED",
                message: "Tên đăng nhập hoặc mật khẩu không chính xác!" 
            });
        }

        res.status(200).json({
            success: true,
            message: "Đăng nhập thành công!",
            data: {
                accountId: account.AccountID,
                username: account.Username,
                fullName: account.FullName,
                role: account.Role,
                token: account.token
            }
        });
    } catch (error) {
        if (error.message === 'Tài khoản đã bị khóa') {
            return res.status(403).json({
                success: false,
                errorCode: "FORBIDDEN",
                message: "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ Quản lý!"
            });
        }
        next(error);
    }
};

const getMe = async (req, res, next) => {
    try {
        const accountId = req.user.AccountID;
        const profile = await authService.getMe(accountId);
        if (!profile) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy tài khoản!' });
        }
        res.status(200).json({ success: true, data: profile });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login,
    getMe
};
