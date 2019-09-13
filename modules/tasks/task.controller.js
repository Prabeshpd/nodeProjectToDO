const { ObjectId } = require("mongoose").Types;

const TaskModel = require("./task.model");

class Controller {
  add(payload) {
    return TaskModel.create(payload);
  }

  save(payload) {
    let id = payload.id ? payload.id : null;
    if (id) return this.update(id, payload);
    return this.add(payload);
  }

  update(id, payload) {
    return TaskModel.findOneAndUpdate({ _id: ObjectId(id) }, { $set: payload }, { new: true });
  }

  get(id) {
    return TaskModel.findOne({ _id: ObjectId(id) });
  }

  list(user_id) {
    if (!user_id) throw Error("Must send userId");
    let tasks = TaskModel.aggregate([
      {
        $match: { user: ObjectId(user_id) }
      }
    ]);
    return tasks;
  }
}
