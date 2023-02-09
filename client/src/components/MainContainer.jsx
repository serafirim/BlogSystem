import React from 'react'
//import SimpleBar from 'simplebar-react'
import {
    CssBaseline
} from '@mui/material'
import SimpleBar from 'simplebar-react'

// #startregion ---------------[ COMPONENTS ]-------------------------------------------
import Copyright from './Copyright';
//import { Digital } from './Digital'
import Header from './Header'
import { Navigation } from './Navigation'
import PageContent from './PageContent'
// #endregion --------------------------------------------------------------------------

// #startregion ---------------[ PARTIALS ]---------------------------------------------
//import { About } from '../partials/HomeOnePage/About'
//import { Story } from '../partials/HomeOnePage/Story'
//import { Portfolio } from '../partials/HomeOnePage/Portfolio'
// #endregion --------------------------------------------------------------------------

export default function MainContainer(props) {
    return (
        <SimpleBar style={{maxHeight:'100vh'}} forceVisible='y' autoHide={false}>
            <Header  />
            <div style={{paddingBottom: '5rem'}}>
                {props.children}
            </div>
            <Copyright  />
        </SimpleBar>
    )
}

/*
export default function MainContainer(props) {
    <SimpleBar style={{maxHeight:'100vh'}} forceVisible='y' autoHide={false}>
        <Header  />
        
        <div style={{paddingBottom: '5rem'}}>
            {props.children}
        </div>
        
        <About />
        <Blog />
        <Portfolio />

        <Copyright  />
    </SimpleBar>
    /*
    return (
        <React.Fragment>
            <CssBaseline />
            <Navigation />
            
            <PageContent page={props.page} />

            <Copyright  />
        </React.Fragment>
    )*/

    /*
    // #region -------------[ BACKUP ]------------------------------------------
    <SimpleBar style={{maxHeight:'100vh'}} forceVisible='y' autoHide={false}>
            <Header  />
            
            <div style={{paddingBottom: '5rem'}}>
                {props.children}
            </div>
            
            <About />
            <Blog />
            <Portfolio />

            <Copyright  />
        </SimpleBar>
    // #endregion --------------------------------------------------------------
     
}
*/
