
import {
  NextFunction,
  Request,
  Response,
} from 'express';
import { UserService } from '../../services';

/**
 * POST /api/v1/register
 */
export const postRegister = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userService = new UserService(req.logger, req.mongo);

    const {
      username,
      email,
      password,
      name,
    } = req.body;

    const { user } = await userService.registerUser(username, email, password, name);

    res.jsend.success({ user }, 201);
  } catch (error) {
    next(error);
  }
};
