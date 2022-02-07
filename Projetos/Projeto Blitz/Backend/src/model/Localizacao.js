const { Model, DataTypes } = require('sequelize')

class Localizacao extends Model {
    static init(data) {
        super.init({
            coordenadas: {
                type: DataTypes.STRING(70),
                allowNull: false
            },
            id_user: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'usuarios',
                    key: 'id'
                }
            },
            id_alerta: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'alerta',
                    key: 'id'
                }
            },
            ativo: {
                type: DataTypes.BOOLEAN,
                allowNull: false

            }
        }, {
            sequelize: data,
            tableName: 'localizacao',
            modelName: 'localizacao',
        })
    }
    static associate(models) {
        Localizacao.belongsTo(models.usuario, { foreignKey: 'id_user' });
        Localizacao.belongsTo(models.alerta, { foreignKey: 'id_alerta' });


    }

}
module.exports = Localizacao;