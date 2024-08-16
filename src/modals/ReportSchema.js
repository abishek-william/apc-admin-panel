import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  siteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site',
    required: true,
  },
  categories: {
    type: Map,
    of: Number,
    required: true,
  },
}, { timestamps: true });

const Report = mongoose.models.Report || mongoose.model('Report', reportSchema);

export default Report;
