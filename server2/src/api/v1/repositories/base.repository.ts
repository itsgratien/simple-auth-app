import { Model, WhereOptions, FindOptions, DestroyOptions } from 'sequelize';
import { Repository } from 'sequelize-typescript';
import { PaginationArgs, FindModelOptions } from '../../../types/shared.types';
import { getPagination } from '../../../helpers/getPagination';

export class BaseRepository<M extends Model> {
  private _model: Repository<M>;

  constructor(model: Repository<M>) {
    this._model = model;
  }

  protected createRecord = async (options: M[any]) => {
    return this._model.create(options);
  };

  protected createManyRecords = async (options: M[any]) => {
    return this._model.bulkCreate(options);
  };

  protected getAllRecord = async (
    options?: FindModelOptions<M>,
    paginate?: PaginationArgs
  ) => {
    if (paginate) {
      const pagination = await getPagination(
        paginate,
        this._model
      );

      const data = await this._model.findAll({
        ...options,
        limit: pagination.limit,
        offset: pagination.offset
      });

      return {
        items: data,
        ...pagination
      };
    }
    const data = await this._model.findAll(options);

    return {
      items: data
    };
  };

  protected getRecordByField = async (
    where: WhereOptions<M>,
    option?: FindOptions
  ) => {
    return await this._model.findOne({ ...option, where });
  };

  protected updateRecord = async (
    where: WhereOptions<M>,
    options: M[any],
    rest?: any
  ) => {
    const update = await this._model.update(options, {
      where,
      ...rest
    });
    if (update[0] === 1) {
      return update;
    }

    throw new Error('Unable to update');
  };

  protected deleteRecord = async (
    where: WhereOptions<M>,
    options?: DestroyOptions
  ) => {
    const del = await this._model.destroy({ where, ...options });

    if (del === 1) {
      return true;
    }

    throw new Error('Unable to delete');
  };
}
