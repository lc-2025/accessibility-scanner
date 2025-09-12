import { Schema, model } from 'mongoose';
import { TScan } from '../types/models/Scan';

// Models - Scan
const scanSchema = new Schema<TScan>(
  {
    // Defining custom index at schema-level for better performance in production
    id: { type: String, required: true, unique: true, index: true },
    url: { type: String },
    status: { type: String, required: true },
    // TODO: Better to define proper schema
    violations: [],
  },
  // Disabling default auto-indexing for better performance in production
  { autoIndex: false, timestamps: true },
);
const scanModel = model('Scan', scanSchema);

export default scanModel;
