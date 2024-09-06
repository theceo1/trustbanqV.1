import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(id: string): Promise<import("./schemas/user.schema").User>;
    create(createUserDto: CreateUserDto): Promise<import("./schemas/user.schema").User>;
}
