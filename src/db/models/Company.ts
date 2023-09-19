import {
	DataTypes,
	Model,
	Optional,
} from "sequelize";

import connection from "../../config/connection";

interface CompanyAttributes {
	id: number;
	name: string;
	email: string;
	working_days: number;
	cutoff_date: number;
	fee: number;
	fee_discount: number;
	join_date?: Date;
	end_date?: Date;
	createdAt?: Date;
	updatedAt?: Date;
  }
  
interface CompanyCreationAttributes extends Optional<CompanyAttributes, "id"> {}
  
class Company extends Model<CompanyAttributes, CompanyCreationAttributes> implements CompanyAttributes {
	public id!: number;
	public name!: string;
	public email!: string;
	public working_days!: number;
	public cutoff_date!: number;
	public fee!: number;
    public fee_discount!: number;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Company.init({
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
    working_days: {
		type: new DataTypes.STRING(128),
		allowNull: false,
	},
    cutoff_date: {
		type: new DataTypes.STRING(128),
		allowNull: false,
	},
    fee: {
		type: new DataTypes.STRING(128),
		allowNull: false,
	},
    fee_discount: {
		type: new DataTypes.STRING(128),
		allowNull: false,
	},
}, {
	sequelize: connection,
	timestamps: true,
	tableName: "companies",
});

export default Company;
