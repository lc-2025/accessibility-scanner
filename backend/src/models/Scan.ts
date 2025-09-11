import { Schema, model } from 'mongoose';
import TScan from '../types/models/Scan';

// Models - Scan
const scanSchema = new Schema<TScan>(
  {
    status: { type: String, required: true },
    violations: [],
  },
  { timestamps: true },
);
const scanModel = model('Scan', scanSchema);

export default scanModel;
