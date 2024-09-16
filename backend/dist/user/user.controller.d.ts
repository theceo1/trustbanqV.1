import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RequestWithUser } from '../auth/interfaces/request-with-user.interface';
export declare class UserController {
    private readonly userService;
    private readonly logger;
    constructor(userService: UserService);
    getProfile(req: RequestWithUser): Promise<Partial<import("../types/user.types").User>>;
    create(createUserDto: CreateUserDto): Promise<import("../types/user.types").User>;
}
