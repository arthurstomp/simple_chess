import { CenteredContent, Button } from "./../style_components";

import Lichess from "./../utils/lichess.js";

export default function ConnectLichess(props) {
  return (
    <CenteredContent>
      <a href={new Lichess().authURL()}>
        <Button>Connect to Lichess</Button>
      </a>
    </CenteredContent>
  );
}
