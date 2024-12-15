import { error } from 'console';
import { User } from 'src/user/entities/user.entity';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { cryptoUtil } from '../utils/crypt.util';
@EventSubscriber()
export class userSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }
  async beforeInsert(event: InsertEvent<User>) {
    await this.validateEmail(event);
    await this.hashInsertedPassword(event);
  }
  async beforeUpdate(event: UpdateEvent<User>) {
    await this.validateEmail(event);
    await this.hashPasswordChange(event);
  }
  async hashPasswordChange(event: UpdateEvent<User>) {
    const userChange = event.entity as User;

    if (userChange.id) {
      const hasUser = await event.manager.findOne(User, {
        where: {
          id: userChange.id,
        },
      });
      if (hasUser) {
        await this.hashPassword(userChange);
      } else {
        return new error('there is no user like this in database');
      }
    }
  }
  async hashInsertedPassword(event: InsertEvent<User>) {
    const user = event.entity;

    await this.hashPassword(user);

    return;
  }
  async hashPassword(user: User) {
    user.salt = await cryptoUtil.generateSalt();
    user.password = await cryptoUtil.hashPassword(user.password, user.salt);
  }

  async validateEmail(event: InsertEvent<User> | UpdateEvent<User>) {
    const user = event.entity;

    if (user.email) {
      const hasUser = await event.manager.findOne(User, {
        where: {
          email: user.email,
        },
      });
      if (hasUser) {
        throw new error('this email is already used');
      } else {
        return;
      }
    }
  }
}
