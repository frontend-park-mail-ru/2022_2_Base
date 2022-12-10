'use strict';

import refresh from './modules/refreshElements';
import router from './modules/Router';
import '../index.scss';
import {config} from './config';

refresh.refreshFooter();
router.start();

config.HTMLskeleton.body = refresh.body;
config.HTMLskeleton.root = refresh.root;
config.HTMLskeleton.header = refresh.header;
config.HTMLskeleton.main = refresh.main;
config.HTMLskeleton.footer = refresh.footer;
