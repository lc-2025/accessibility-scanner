import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import scanModel from '../models/Scan';
import { setFilter, validateRequest } from '../utils/api';
import { MESSAGE } from '../utils/constants';

/**
 * @description Scans getter
 * Returns all the scans
 * @author Luca Cattide
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getScans = (req: Request, res: Response, next: NextFunction): void => {
  // Query validation
  validateRequest(req, res);

  // Query Pagination
  const options = {
    skip: req.query.skip ? Number(req.query.skip) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
  };

  scanModel
    .find(
      req.query.ids ? setFilter(req.query.ids as string, true) : {},
      null,
      options,
    )
    .exec()
    .then(async (data) => {
      // Data check
      if (!data) {
        // Async error handling via custom error middleware
        next({ message: MESSAGE.EMPTY });
      }

      res.send({ data, count: await scanModel.countDocuments().exec() });
    })
    .catch((error) => next(error));
};

/**
 * @description Scan getter
 * Returns a specific scan by ID
 * @author Luca Cattide
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {*}  {void}
 */
const getScan = (req: Request, res: Response, next: NextFunction): void => {
  // Requirements check
  if (req.query.id) {
    // Query validation
    validateRequest(req, res);
    scanModel
      .findById(req.query.id)
      .exec()
      .then((data) => {
        // Data check
        if (!data) {
          // Async error handling via custom error middleware
          next({ message: MESSAGE.EMPTY });
        }

        res.send(data);
      })
      .catch((error) => next(error));
  } else {
    /**
     * Synchronous error handling
     * Leaving `next` for async-action usage as best-practice
     * i.e. async APIs - `File`, `fetch`, etc.
     */
    res.status(400).send({
      message: `${MESSAGE.MISSING} user input.`,
    });
  }
};

/**
 * @description Scan putter
 * Updates a scan
 * @author Luca Cattide
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {*}  {Promise<void>}
 */
const putScan = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  // Requirements check
  if (req.query.id && req.body.scan) {
    const { id } = req.query;
    const { body } = req;
    // Query & body validation
    const schema = Joi.object({
      id: Joi.string().required(),
    });
    const { error } = schema.validate({
      ...req.query,
      ...req.body,
    });

    // Validation check
    if (error) {
      res.status(409).send(error.details[0].message);
    }

    // TODO: Check how to pass the id
    const filter = setFilter(id as string, true);
    const scanUpdated = await scanModel
      // Updates and returns the record with new values
      .findOneAndUpdate(filter, { ...body.scan })
      .exec();

    // Data check
    if (!scanUpdated) {
      // Async error handling via custom error middleware
      next({ message: MESSAGE.SERVER });
    }

    scanModel
      .find(filter)
      .exec()
      .then(async (data) => {
        // Data check
        if (!data) {
          // Async error handling via custom error middleware
          next({ message: MESSAGE.EMPTY });
        }

        res.send(data);
      });
  } else {
    res.status(400).send({
      message: `${MESSAGE.MISSING} user input.`,
    });
  }
};

/**
 * @description Scan deleter
 * Deletes a scan
 * @author Luca Cattide
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {*}  {Promise<void>}
 */
const deleteScan = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  // Requirements check
  if (req.query.id) {
    // Query validation
    validateRequest(req, res);

    // TODO: Check how to pass the id
    const filter = setFilter(req.query.id as string, true);
    const scanDeleted = await scanModel
      // Updates and returns the record with new values
      .findOneAndDelete(filter)
      .exec();

    // Data check
    if (!scanDeleted) {
      // Async error handling via custom error middleware
      next({ message: MESSAGE.SERVER });
    }

    res.send(scanDeleted);
  } else {
    res.status(400).send({
      message: `${MESSAGE.MISSING} user input.`,
    });
  }
};

export { getScans, getScan, putScan, deleteScan };
