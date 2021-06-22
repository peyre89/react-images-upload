import { useRef } from 'react';

import useImagesUpload from '../../hooks/useImagesUpload';

import { Box, Button, CloseButton, Flex, Grid, HStack } from '@chakra-ui/react';

const defaultImages = [
  {
    URL: 'https://images.unsplash.com/photo-1624024946645-d02c208b1c4d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=640',
    id: 'a123'
  },
  {
    URL: 'https://images.unsplash.com/photo-1502778837336-8990a2ae26d2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1331&q=80',
    id: 'b123'
  }
]

function Demo() {
  const {
    inputProps,
    imagesAccepted,
    imagesRejected,
    onChange,
    onDelete,
    onDeleteAll,
  } = useImagesUpload({
    defaultValue: defaultImages,
    multiple: true,
    onChange: (list, previous, change) => {
      console.log('onSuccess', list, previous, change);
    },
  });

  const buttonRef = useRef(null);

  const handleClick = () => {
    if (buttonRef?.current) {
      buttonRef.current.click();
    }
  }

  return (
    <Box mt={4}>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              {imagesAccepted.map(image => (
                <Box pos="relative" key={image.key}>
                  <img src={image?.objectURL} alt={`alt ${image.key}`} />
                  <div>
                    <Box pos="absolute" top="1" right="1">
                    <CloseButton colorScheme="red" onClick={() => onDelete(image.key)} />
</Box>
                    
                  </div>
                </Box>
              ))}
              </Grid>

          {imagesRejected.length > 0 && (
            <>
              <h2>Rejected</h2>
                {imagesRejected.map((image, index) => (
                  <div key={index}>
                    <img src={image?.objectURL} alt={`alt ${index}`} />
                  </div>
                ))}
            </>
          )}

        <input
          type='file'
          onChange={onChange}
          ref={buttonRef}
          className="input"
          {...inputProps}
        />

<Flex justify="flex-end" mt={8}>
  <HStack spacing="16px">
          <Button isDisabled={imagesAccepted.length === 0} onClick={onDeleteAll}>
            Reset
          </Button>
          <Button colorScheme="purple" onClick={handleClick}>
            Add images
          </Button>
          </HStack>
          </Flex>
    </Box>
  )
}

export default Demo;
