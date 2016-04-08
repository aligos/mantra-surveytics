import React from 'react';

import dataComposer from '../../composers/account/login.jsx';
import Component from './_form.jsx';

const Container = dataComposer(Component);

export default class extends React.Component {

  render() {
    return (
      <div className="bs-docs-section clearfix">
          <div className="row">

              <div className="col-md-4 col-md-offset-4">
                  <div className="ibox-content">

                    <h2 className="font-bold">Login</h2>
                    <p>
                        Enter your username and your password.
                    </p>


                    <Container />

                    <a href="/password">
                        <small>Forgot password?</small>
                    </a>

                    <p className="text-muted text-center">
                        <small>Do not have an account?</small>
                    </p>
                    <a className="btn btn-sm btn-white btn-block" href="/register">Create an account</a>


                  </div>
              </div>
          </div>
          <hr/>
      </div>

    );
  }
}
