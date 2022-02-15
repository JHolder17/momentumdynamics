import React from 'react';
import { Progress } from 'reactstrap';

const RacerProgress = (props) => {
  return (
    <div id="racerProgress">
       <div className="text-center">{props.name}: {Math.round(props.position)}</div>
      <Progress animated color={props.color} value={props.position} />
    </div>
  );
};

export default RacerProgress;