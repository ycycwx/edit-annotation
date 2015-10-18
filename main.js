/**
 * @file Index
 * @author ycy
 */

import React from 'react';
import {render} from 'react-dom';
import Router from 'react-router';

import routes from './src/routes/routes-client';

render(<Router routes={routes}/>, document.getElementById('main'));
