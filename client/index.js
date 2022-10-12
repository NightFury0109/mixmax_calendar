import './styles.css';

import React, { Fragment, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/Calendar';
import Header from './components/Header';
import ShowTimesImFreeModal from './components/ShowTimesImFreeModal';
import ShowTimesImFreeToggle from './components/ShowTimesImFreeToggle';
import MixmaxUpsell from './components/MixmaxUpsell';

const Index = () => {
  const [calendarResponse, setCalendarResponse] = useState();
  const [guestUserId, setGuestUserId] = useState();
  const [showingSTIFModal, setShowingSTIFModal] = useState(false);

  const hostUserId = 'host_user_1';

  useEffect(() => {
    setCalendarResponse(null);

    let url = `/api/calendar?hostUserId=${hostUserId}`;
    if (guestUserId) url += `&guestUserId=${guestUserId}`;
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setCalendarResponse(response);
      });
  }, [guestUserId]);

  if (!calendarResponse) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      {showingSTIFModal && (
        <ShowTimesImFreeModal
          calendarName={calendarResponse.name}
          onClose={(guestUserId) => {
            setGuestUserId(guestUserId);
            setShowingSTIFModal(false);
          }}
        />
      )}

      <div className='p+++'>
        <Header calendarName={calendarResponse.name} />
        <div className='sc-htpNat gVQLsp mb++ public-calendar__content  flexfill  flexbox  flexbox--column  bg-white  shadow  appointmentslots__pubcal-contents'>
          <div className='flexbox  flexbox--column'>
            <Calendar
              timeslots={calendarResponse.timeslots}
              timeslotLengthMin={calendarResponse.timeslotLengthMin}
            />
            <div className='pv++ public-calendar__footer  flexbox  flex-align-center flex-space-between  mt+   pr+++'>
              <div className='flexbox flex-align-center'>
                {/* <ShowTimesImFreeToggle
                  isToggleOn={guestUserId || showingSTIFModal}
                  onToggle={() => setShowingSTIFModal(!showingSTIFModal)} /> */}
              </div>
              <MixmaxUpsell />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
ReactDOM.render(<Index />, document.getElementById('app'));
