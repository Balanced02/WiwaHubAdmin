import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert } from 'reactstrap'

import { clearError, clearInfo } from '../actions/feedback'

const AlertComponent = ({ dispatch, errors, infos }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '5px',
        right: '5px',
        zIndex: 2,
      }}
    >
      <div className="alertBox">
        {infos.reverse().map((info, i) =>
          <Alert color={info.color || 'success' } key={i} toggle={() => dispatch(clearInfo(info.id))}>
            {info.info}
          </Alert>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    infos: state.feedback.infos,
  }
}
export default connect(mapStateToProps)(AlertComponent)