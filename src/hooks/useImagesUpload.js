import { useEffect, useMemo, useReducer, useRef } from 'react'

import { initialState, reducer } from '../store'

import { acceptToString } from '../utils/accept'
import { extensionIsValid } from '../utils/extension'
import { noop } from '../utils/noop'
import { sizeIsValid } from '../utils/size'

const createOldItem = (
  file,
  count,
) => {
  return {
    key: `photo-${count}`,
    objectURL: file.URL,
    new: false,
  }
}

const createNewItem = (
  file,
  count,
) => {
  return {
    file,
    key: `photo-${count}`,
    objectURL: URL.createObjectURL(file),
    new: true,
  }
}

const defaultOptions = {
  defaultValue: [],
  accept: ['image/*'],
  max: Infinity,
  multiple: false,
  replace: false,
  onChange: noop,
}

function useImagesUpload(options) {
  const {
    defaultValue,
    accept,
    max,
    multiple,
    replace,
    onChange,
  } = {
    ...defaultOptions,
    ...options,
  }

  const init = useRef(false);
  const countRef = useRef(0);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const toto = async () => {
      // Validation
      const acceptedFiles = [];

      if (!defaultValue) {
        return;
      }
    
      for (const file of defaultValue) {
        const newFile = await createOldItem(file, ++countRef.current)
        acceptedFiles.push(newFile)
      }

      dispatch({
        type: 'push',
        imagesAccepted: acceptedFiles,
        imagesRejected: [],
      })

      const list = state.imagesAccepted.concat(acceptedFiles)

      onChange(list, state.imagesAccepted, acceptedFiles);

      init.current = true;
    }

    if (!init.current) {
      toto();
    }
  }, []);

  const inputProps = useMemo(
    () => {
      return {
        accept: acceptToString(accept),
        multiple,
        style: { display: 'none' },
      }
    },
    [accept, multiple]
  )

  const handleChange = async event => {
    const target = event.target
    const files = target.files

    // Validation
    const acceptedFiles = []
    const fileRejections = []

    if (files === null) {
      return;
    }

    for (const file of files) {
      const newFile = await createNewItem(file, ++countRef.current)

      if (extensionIsValid(file, accept) && sizeIsValid(file, max)) {
        acceptedFiles.push(newFile)
      } else {
        fileRejections.push(newFile)
      }
    }

    const list = state.imagesAccepted.concat(acceptedFiles)

    dispatch({
      type: replace ? 'replace' : 'push',
      imagesAccepted: acceptedFiles,
      imagesRejected: fileRejections,
    })

    onChange(list, state.imagesAccepted, acceptedFiles);
  }

  const handleDelete = indexToDelete => {
    const itemToDelete = state.imagesAccepted.filter((image) => image.key === indexToDelete)?.[0]
    const filtered = state.imagesAccepted.filter((image) => image.key !== indexToDelete)

    // Cleaning of the memory
    URL.revokeObjectURL(itemToDelete.objectURL);

    dispatch({
      type: 'replace',
      imagesAccepted: filtered,
      imagesRejected: state.imagesRejected,
    })
  }

  const handleDeleteAll = () => {
    // Cleaning of the memory
    state.imagesAccepted.forEach((image) => URL.revokeObjectURL(image.objectURL));
    state.imagesRejected.forEach((image) => URL.revokeObjectURL(image.objectURL));

    dispatch({
      type: 'replace',
      imagesAccepted: [],
      imagesRejected: [],
    })
  }

  const setImagesAccepted = list => {
    dispatch({
      type: 'replace',
      imagesAccepted: list,
      imagesRejected: state.imagesRejected,
    })
  }

  return {
    ...state,
    inputProps,
    onChange: handleChange,
    onDelete: handleDelete,
    onDeleteAll: handleDeleteAll,
    setImagesAccepted,
  }
}

export default useImagesUpload;
