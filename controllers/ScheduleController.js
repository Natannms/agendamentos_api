const database = require("../models");

class ScheduleController {
  static async getAll(req,res) {
    const schedules = await database.Schedule.findAll({
      include: [
        {
          model: database.User,
          attributes: ['id', 'name'],
          as: 'user',
          include: [
            {
              model: database.Address,
              attributes: ['rua', 'numero', 'bairro', 'cidade', 'estado', 'cep'],
              as: 'address'
            }
          ]
        }
      ],
      order: [['schedule_date', 'ASC'],['schedule_hour' , 'ASC']], // Ordena por schedule_date em ordem decrescente
    });

    if (!schedules) {
      return res.status(400).json({
        statusCode: 400,
        message: "Não foi possivel encontrar",
      });
    }

    return res.json({
      statusCode: 200,
      schedules,
    });
  }
  static async getAllByUserId(req,res) {
    const schedules = await database.Schedule.findAll({
      where: { userId: req.params.userId },
      include: [
        {
          model: database.User,
          attributes: ['id', 'name'],
          as: 'user'
        }
      ]
    });

    if (!schedules) {
      return res.status(400).json({
        statusCode: 400,
        message: "Não foi possivel encontrar",
      });
    }

    return res.json({
      statusCode: 200,
      schedules,
    });
  }

  static async getOne(req, res) {
    const { id } = req.params;

    const schedule = await database.Schedule.findOne({
      where: { id: id },
      include: [
        {
          model: database.User,
          attributes: ['id', 'name'],
          as: 'user'
        }
      ]
    });

    if (!schedule) {
      return res.status(400).json({
        statusCode: 400,
        message: "Não foi possivel encontrar",
      });
    }

    return res.json({
      statusCode: 200,
      schedule,
    });
  }

  static async update(req, res) {
    const { id } = req.params;
    const { descriptionService, price, status, paymentStatus, schedule_date, schedule_hour  } = req.body;

    const schedule = await database.Schedule.findOne({
      where: { id: id },
    });

    if (!schedule) {
      res.send({ message: "Not founded", statusCode: 400 });
      return;
    }

    await database.Schedule.update(
      { descriptionService, price, status, paymentStatus, schedule_date, schedule_hour },
      {
        where: {
          id: id,
        },
      }
    );

    res.send({ message: "Updated successfully", statusCode: 200 });
  }

  static async delete(req, res){
    const { id } = req.params

    const schedule = await database.Schedule.findOne({
        where: { id: id },
    });

    if (!schedule) {
        res.send({ message: "Not founded", statusCode:400 });
        return
    }

    await database.Schedule.destroy({
        where: {
            id: id
        }
    });

    res.send({ message: "Feito com sucesso!", statusCode:200 });
  }

  static async createWithUser(req, res) {
    try {
      const { email, password, name, rua, numero, bairro, cidade, estado, cep, descriptionService, price, status, paymentStatus, schedule_date, schedule_hour, type } = req.body;


      const userExists = await database.User.findOne({
        where: { email: email },
      });

      if (userExists) {
        res.send({ message: "User already exists" });
        return;
      }

      const user = await database.User.create({
        name,
        email,
        password,
        type: type,
      });

      // Verifique se o usuário com o ID especificado existe
      if (!user) {
        return res.status(400).json({
          statusCode: 400,
          message: "Usuário não pode ser criado",
        });
      }

       // setUser Address
       const userAddress = await database.Address.create({
        userId:user.id, rua, numero, bairro, cidade, estado, cep
       });


      if(!userAddress){
        user.destroy()
        res.send({ message: "Não foi possivel cadastrar endereço do usuário" });
      }

      const newSchedule = await database.Schedule.create({
        userId:user.id,
        descriptionService,
        price,
        status,
        paymentStatus,
        schedule_date,
        schedule_hour
      });

      if(!newSchedule){
        res.send({ message: "Novo usuário foi cadastrado mas o agendamento não foi possivel" });
      }

      return res.status(201).json({
        statusCode: 201,
        message: "Agendamento criado com sucesso",
        schedule: newSchedule,
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        statusCode: 500,
        message: "Erro interno do servidor",
      });
    }
  }

  static async createByUserId(req, res) {
    try {
      const { descriptionService, price, status, paymentStatus, schedule_date, schedule_hour } = req.body;
      const {userId} = req.params;

      const userExists = await database.User.findOne({
        where: { id: userId },
      });

      if (!userExists) {
        res.send({ message: "Usuário não encontrado" });
        return;
      }

      const newSchedule = await database.Schedule.create({
        userId,
        descriptionService,
        price,
        status,
        paymentStatus,
        schedule_date,
        schedule_hour
      });

      if(!newSchedule){
        res.send({ message: "Não foi possivel criar agendamento" });
      }

      return res.status(201).json({
        statusCode: 201,
        message: "Agendamento criado com sucesso",
        schedule: newSchedule,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        statusCode: 500,
        message: "Erro interno do servidor",
      });
    }
  }
}

module.exports = ScheduleController;
