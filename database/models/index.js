import { Blog } from "./Blog.js";
import { User } from "./User.js";

User.hasMany(Blog);
Blog.belongsTo(User);

await Blog.sync({ alter: true });
await User.sync({ alter: true });

export { Blog, User };
