import { SetMetadata } from '@nestjs/common';



export const NeedRole = (role:number) => SetMetadata('role', role);
