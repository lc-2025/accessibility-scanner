import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'node:crypto';
import Joi from 'joi';
import scanModel from '../models/Scan';
import { setDate, setFilter, testUrls, validateRequest } from '../utils/api';
import { MESSAGE, DATA_VALIDATION } from '../utils/constants';

/**
 * @description Scan setter
 * Starts and stores multiple scans
 * @author Luca Cattide
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {*}  {Promise<void>}
 */
const postScan = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  if (req.body && req.body.urls) {
    const { urls } = req.body;
    // Query validation
    const schema = Joi.object({
      urls: Joi.array().items(Joi.string()).required(),
    });

    validateRequest(req, res, schema);

    const session = await scanModel.db.startSession();

    session.startTransaction();

    try {
      const scans = await testUrls(urls);

      scans.forEach(async ({ url, status, timestamp, violations }) => {
        const scan = new scanModel({
          id: randomUUID(),
          url,
          status,
          createdAt: setDate(timestamp),
          updatedAt: setDate(timestamp),
          violations,
        });

        await scan.save({ session });
      });

      await session.commitTransaction();

      res.status(201).send({
        result: MESSAGE.RUN,
      });
    } catch (error) {
      await session.abortTransaction();

      next(error);
    } finally {
      session.endSession();
    }
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
 * @description Scan getter
 * Returns a specific scan by ID
 * @author Luca Cattide
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {*}  {Promise<void>}
 */
const getScan = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  // Requirements check
  if (req.params.id) {
    const { id } = req.params;
    // Query validation
    const schema = Joi.object(DATA_VALIDATION);

    validateRequest(req, res, schema);

    const session = await scanModel.db.startSession();

    session.startTransaction();
    scanModel
      .findOne(setFilter([id]))
      .session(session)
      .exec()
      .then(async (data) => {
        // Data check
        if (!data) {
          // Async error handling via custom error middleware
          next({ message: MESSAGE.EMPTY });
        } else {
          await session.commitTransaction();

          res.send(data);
        }
      })
      .catch(async (error) => {
        await session.abortTransaction();

        return next(error);
      })
      .finally(() => {
        session.endSession();
      });
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
 * @description Scans getter
 * Returns all the scans
 * @author Luca Cattide
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {*}  {Promise<void>}
 */
const getScans = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  // Query validation
  const validationParam = Joi.string().pattern(new RegExp('^([0-9]*)$'));
  const schema = Joi.object({
    skip: validationParam,
    limit: validationParam,
  });

  validateRequest(req, res, schema);

  // Query Pagination - optional
  const options = {
    skip: req.query.skip ? Number(req.query.skip) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
  };

  const session = await scanModel.db.startSession();

  session.startTransaction();

  scanModel
    .find({}, null, options)
    .session(session)
    .exec()
    .then(async (data) => {
      // Data check
      if (!data) {
        // Async error handling via custom error middleware
        next({ message: MESSAGE.EMPTY });
      } else {
        const count = await scanModel.countDocuments().session(session).exec();

        await session.commitTransaction();

        res.send({
          data,
          count,
        });
      }
    })
    .catch(async (error) => {
      await session.abortTransaction();

      return next(error);
    })
    .finally(() => {
      session.endSession();
    });
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
  if (req.params.id) {
    const { id } = req.params;
    // Data validation
    const schema = Joi.object(DATA_VALIDATION);

    validateRequest(req, res, schema);

    const session = await scanModel.db.startSession();

    session.startTransaction();

    try {
      const filter = setFilter([id]);
      const previousScan = await scanModel
        .findOne(filter)
        .session(session)
        .exec();

      // Data check
      if (!previousScan) {
        // Async error handling via custom error middleware
        next({ message: MESSAGE.EMPTY });
      }

      const newScan = await testUrls([previousScan!.url]);
      const { timestamp } = newScan[0];
      const scanUpdated = await scanModel
        // Updates and returns the record with new values
        .findOneAndUpdate(
          filter,
          {
            ...newScan[0],
            updatedAt: new Date(timestamp),
          },
          { new: true },
        )
        .session(session)
        .exec();

      // Data check
      if (!scanUpdated) {
        // Async error handling via custom error middleware
        next({ message: MESSAGE.SERVER });
      }

      await session.commitTransaction();

      res.send(scanUpdated);
    } catch (error) {
      await session.abortTransaction();

      next(error);
    } finally {
      session.endSession();
    }
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
  if (req.params.id) {
    const { id } = req.params;
    const schema = Joi.object(DATA_VALIDATION);

    validateRequest(req, res, schema);

    const session = await scanModel.db.startSession();

    session.startTransaction();
    scanModel
      // Delete and returns the record reference
      .findOneAndDelete(setFilter([id]))
      .session(session)
      .exec()
      .then(async (data) => {
        // Data check
        if (!data) {
          // Async error handling via custom error middleware
          next({ message: MESSAGE.EMPTY });
        } else {
          await session.commitTransaction();

          res.send(data);
        }
      })
      .catch(async (error) => {
        await session.abortTransaction();

        return next(error);
      })
      .finally(() => {
        session.endSession();
      });
  } else {
    res.status(400).send({
      message: `${MESSAGE.MISSING} user input.`,
    });
  }
};

export { getScans, getScan, postScan, putScan, deleteScan };
