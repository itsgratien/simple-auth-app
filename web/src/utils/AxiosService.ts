import axiosInstance from './AxiosSetup';
import { AxiosService } from 'src/types/Axios';

const axiosService = async <Data>({
  method,
  uri,
  data,
  onError,
  onSuccess,
  onDownloadProgress,
  onUploadProgress,
  contentType,
}: AxiosService<Data>) => {
  try {
    const res = await axiosInstance({
      method,
      url: uri,
      data,
      headers: {
        'Content-Type': contentType ?? 'application/json',
      },
      onDownloadProgress: (evt) => {
        const percentage = Math.round((evt.loaded / evt.total) * 100);
        if (onDownloadProgress) {
          onDownloadProgress(percentage);
        }
      },
      onUploadProgress: (evt) => {
        const percentage = Math.round((evt.loaded / evt.total) * 100);

        if (onUploadProgress) {
          onUploadProgress(percentage);
        }
      },
    });
    return onSuccess(res);
  } catch (error: any) {
    return onError(error);
  }
};

export default axiosService;
