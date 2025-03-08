const authService = require('../biz/authService.biz');
const { verifyToken } = require('../middleware/authMiddleware');



class AuthController {
  constructor(authService) {
    this.authService = authService;
   // this.getDashboard = this.getDashboard.bind(this);
  }

  login = async (req, res) => {
    await this.authService.login(req, res);
  };

  register = async (req, res) => {
    await this.authService.register(req, res);
  };


  getDashboard = async (req, res) => {
        await this.authService.getDashboard(req, res);
  };
}


module.exports = new AuthController(authService);