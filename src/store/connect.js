import {connect} from 'react-redux'

const connectComponent = (mapStateToProps, mapDispatchToProps) => {
  return component => connect(mapStateToProps, mapDispatchToProps)(component);
}


export default connectComponent;