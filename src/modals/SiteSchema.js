import mongoose from 'mongoose';

const SiteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  totaldays: { type: Number, default:0 },
  totalmanpower: { type: Number, default:0 },
});

export default mongoose.models.Site || mongoose.model('Site', SiteSchema);
