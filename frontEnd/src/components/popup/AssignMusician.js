import React, { Fragment, useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
} from '@material-tailwind/react';
import MusicianAssignCard from '../cards/MusicianAssignCard';
import { useGetAllUsersPerEvent } from '../../hooks/useAdminEvents';
function AssignMusician(props) {
  const { EventDate, EventId, disabled } = props;
  const dateObj = new Date(Date.parse(EventDate));
  const newDate = subHours(dateObj, 3);
  const formattedDate = format(newDate, 'HH:mm dd/MM/yyyy');
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  //TODO get users that assign to event axios
  


  //use axios assign user to event
  function handleAssign(EventID, userID) {
    // handle cancel button click
  }
  const {
    data: dataRegistered,
    error,
    isError,
    isLoading,
  } = useGetAllUsersPerEvent(EventId, {
    enabled: open, // Only fetch data when the dialog is open
  });

  const handleOpen = () => setOpen(!open);

  //use axios assign user to event
  function handleAssign(EventID, userID) {
    // handle assign button click
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error(error);
  }

  return (
    <Fragment>
      <Button onClick={handleOpen} size="sm" color="green" disabled={!disabled}>
        Assign
      </Button>
      <Dialog
        size="xl"
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className="flex justify-between">
          Assign Musician
          <Typography variant="lead">
            Event Date:{formattedDate}
            
          </Typography>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogHeader>
        <DialogBody divider className="h-[40rem] overflow-scroll">
          {dataRegistered?.data?.length === 0 ? (
            <div>No musicians assigned.</div>
          ) : (
            <div className="flex flex-col flex-auto items-center gap-2">
              {dataRegistered?.data?.map((data) => (
                <MusicianAssignCard
                  key={data.UserId}
                  eventId={EventId}
                  userId={data.UserId}
                  bandName={data.BandName}
                  experience={data.YearsOfExperience}
                  Url={data.URL}
                  description={data.Description}
                  setOpen={setOpen}
                />
              ))}
            </div>
          )}
        </DialogBody>
      </Dialog>
    </Fragment>
  );
}

export default AssignMusician;
