import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RequestWithUser } from '../auth/interfaces/request-with-user.interface';
export declare class UserController {
    private readonly userService;
    private readonly logger;
    constructor(userService: UserService);
    getProfile(req: RequestWithUser): Promise<Partial<import("./schemas/user.schema").User>>;
    create(createUserDto: CreateUserDto): Promise<import("./schemas/user.schema").User>;
}
