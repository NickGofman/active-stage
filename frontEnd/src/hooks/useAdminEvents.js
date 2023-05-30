import { makeRequest } from '../axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';

//#region ==============CreateNewEvent==============

export const useCreateNewEvent = (onSuccess, onError) => {
  console.log('IN useCreateNewEvent ');
  return useMutation(createNewEvent, {
    onSuccess,
    onError,
  });
};

const createNewEvent = (data) => {
  // console.log('IN createNewEvent, data: ', data);
  //axios request
  return makeRequest.post('/admin/createEvent', data);
};
//#endregion

//#region ==============get musical type list==============
const getMusicalStyles = () => {
  return makeRequest.get('/admin/getMusicalStyles');
};

export const useGetMusicalStyles = () => {
  // console.log('IN getMusicalStyles ');
  return useQuery('getMusicalStyles', getMusicalStyles);
};

const getEventDates = () => {
  console.log('getEEventsDate');
  return makeRequest.get('/admin/eventsDates');
};
export const useGetEventDates = () => {
  return useQuery('getEventDates', getEventDates);
};

//#endregion

export const useAllAssignMusicians = () => {
  console.log('getAllAssignMusicians');
  return useQuery('getAllEvent', getAllAssignMusicians);
};

const getAllAssignMusicians = () => {
  return makeRequest.get('/admin/getAllAssignMusicians');
};
