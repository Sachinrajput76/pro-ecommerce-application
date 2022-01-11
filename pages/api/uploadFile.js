import nc from 'next-connect'
import dbConnect from '../../config/dbConnect';
import { upload } from '../../controllers/uploadController'
import onError from '../../middlewares/errors'

const handler = nc({ onError });
dbConnect();
handler.post(upload)
export default handler;