import React from 'react';
import {useActionSheet} from '@expo/react-native-action-sheet';
import ImagePicker, {
  Options as PickerOptions,
  Image,
} from 'react-native-image-crop-picker';
import {ImageSourcePropType} from 'react-native';

export class ImagePickerError extends Error {
  isCancelled: boolean;
  error?: Error;
  constructor(message: string, error?: Error, isCancelled = false) {
    super(message);
    this.isCancelled = isCancelled;
    if (error) {
      this.error = error;
    }
    this.name = 'ImagePickerError';
  }
}

function isImage(object: any): object is Image {
  return 'path' in object && 'data' in object;
}

export default function useImagePicker(
  initialSource?: ImageSourcePropType,
  pickerOptions?: PickerOptions,
): {
  source?: ImageSourcePropType;
  contentType?: string;
  base64?: string;
  pick: () => void;
} {
  const [base64, setBase64] = React.useState<string | undefined>();
  const [source, setSource] = React.useState<ImageSourcePropType | undefined>(
    initialSource,
  );
  const [contentType, setContentType] = React.useState<string | undefined>();

  const {showActionSheetWithOptions} = useActionSheet();
  const pickAvatar = React.useCallback(() => {
    const buttonOptions = ['Take New Photo', 'Photo Library', 'Cancel'];
    const cancelButtonIndex = 2;
    return new Promise((resolve, reject) => {
      showActionSheetWithOptions(
        {options: buttonOptions, cancelButtonIndex},
        async (buttonIndex) => {
          const _pickerOptions: PickerOptions = {
            width: 512,
            height: 512,
            cropping: true,
            mediaType: 'photo',
            includeBase64: true,
            useFrontCamera: true,
            ...pickerOptions,
          };

          try {
            let picked = null;
            if (buttonIndex === 1) {
              picked = await ImagePicker.openPicker(_pickerOptions);
            } else if (buttonIndex === 0) {
              picked = await ImagePicker.openCamera(_pickerOptions);
            } else if (buttonIndex === cancelButtonIndex) {
              reject(
                new ImagePickerError(
                  'Cancelled from action sheet',
                  undefined,
                  true,
                ),
              );
              return;
            }
            if (isImage(picked)) {
              const {path, data, mime} = picked;
              if (data != null) {
                setBase64(data);
              }
              setSource({uri: path});
              setContentType(mime);

              const result = {
                source: {uri: path},
                base64: data,
                contentType: mime,
                from: buttonIndex === 0 ? 'camera' : 'gallery',
              };
              resolve(result);
              return;
            }
            reject(
              new ImagePickerError(
                'Unknown Error - May be cancelled from native picker or other error',
                undefined,
              ),
            );
          } catch (error) {
            console.log('useImagePicker - Error occured', error);
            reject(error);
          }
        },
      );
    });
  }, [
    setBase64,
    setSource,
    setContentType,
    showActionSheetWithOptions,
    pickerOptions,
  ]);
  return {source, contentType, base64, pick: pickAvatar};
}
