import {
	DataTypes,
	Model,
	Optional,
} from "sequelize";

import connection from "../../config/connection";

interface UserAttributes {
	id: number;
	name: string;
	email: string;
	password: string;
	createdAt?: Date;
	updatedAt?: Date;
  }
  
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}
  
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
// 'projects' is excluded as it's not an attribute, it's an association.
// class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
	// id can be undefined during creation when using `autoIncrement`
	public id!: number;
	public name!: string;
	public email!: string;
	public password!: string;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
  
	get fullName(): string {
	  return this.name;
	}
}

User.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: new DataTypes.STRING(128),
		allowNull: false,
	},
	email: {
		type: new DataTypes.STRING(128),
		allowNull: false,
	},
	password: {
		type: new DataTypes.STRING(128),
		allowNull: false,
	},
}, {
	sequelize: connection,
	timestamps: true,
	tableName: "users",
});

export default User;
