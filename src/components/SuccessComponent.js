import DoneIcon from "@material-ui/icons/Done";
import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.success.main,
  },
  doneIcon: {
    display: "flex",
    fontSize: 80,
    color: green,
    width: "100%",
  },
}));

const SuccessComponent = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <DoneIcon className={classes.doneIcon} />
      Please verify your email address, you should have received an email from us already
    </div>
  );
};
export default SuccessComponent;
