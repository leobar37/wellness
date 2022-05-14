import {
    Badge, Heading,
    HStack, ListItem, Text, VStack,
    SystemStyleObject
} from '@chakra-ui/react';
import {  AlertResult, TypeDataAlertEnum } from "@wellness/admin-ui";
import { FC } from "react";

export const ItemAlert : FC<{ content :  AlertResult}>  = ( {content}) => {
   const { date , dateLabel , label , sublabel ,  typeData} = content;
   const mapperBadge : Record<string,  SystemStyleObject> = {
      [TypeDataAlertEnum.birthday] : {
        bg : "primary"
      },
      [TypeDataAlertEnum.plans_to_overcome] :{
        bg: "brown.500"
      }
   }
   const textBadeMapper : Record<string, string> = {
      [TypeDataAlertEnum.birthday] : "Cumpleaños",
      [TypeDataAlertEnum.plans_to_overcome] : "Planes"
   }
   const sxBadge= mapperBadge[typeData];
   return (
    <ListItem px={3}>
      <HStack justify={'space-between'} width="full">
        <VStack alignItems={'flex-start'} textAlign="start">
          <Heading as="h4" size={'sm'}>
            {label}
          </Heading>
          <Text textColor={'#524C4C'}>{sublabel}</Text>
        </VStack>
        <VStack alignItems={'flex-end'}>
          <Badge sx={sxBadge} bg="brown.300" textColor={'white'} rounded="md" py="1" px="3">
            {textBadeMapper[typeData]}
          </Badge>
          <Text fontSize={'medium'} color={'gray.400'}>
            {dateLabel}
          </Text>
        </VStack>
      </HStack>
    </ListItem>
  );
};
