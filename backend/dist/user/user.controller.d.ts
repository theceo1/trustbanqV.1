import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RequestWithUser } from '../auth/interfaces/request-with-user.interface';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(req: RequestWithUser): Promise<import("./schemas/user.schema").User | null>;
    create(createUserDto: CreateUserDto): Promise<import("./schemas/user.schema").User>;
}
