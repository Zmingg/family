import {connect} from 'react-redux'

const connectComponent = (mapStateToProps, mapDispatchToProps) =>
    component => connect(mapStateToProps, mapDispatchToProps)(component);

export default connectComponent;