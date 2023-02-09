// #region ---------------[ REQUIRED ]------------------------------------------------
import React from 'react'
import axios from 'axios'
import ReactHtmlParser, {
    convertNodeToElement,
    processNodes
} from 'react-html-parser'
import DOMPurify from 'dompurify'
import { styled } from "@mui/material/styles"
import { 
    Box,
    Button,
    Divider,
    Grid,
    Link,
    Paper,
    TextField,
    Typography
   } from "@mui/material"
// #endregion ------------------------------------------------------------------------

/*
const SpecialButton = ({ children, color }) => {
    <button style={{color}}>{children}</button>
}
*/

/*
const htmlFromCMS = `
<div>Hi, 
  <SpecialButton color="red">My Button</SpecialButton>
</div>`;
/*

/*
const htmlFrom = (htmlString) => {
    const cleanHtmlString = DOMPurify.sanitize(htmlString,
        { USE_PROFILES: { html: true } });
      const html = parse(cleanHtmlString);
      return html;
}
*/

function transform(node, index) {
    // return null to block certain elements
    // don't allow <span> elements

    if (node.type === "tag" && node.name === "span") {
      return null
    }
  
    // Transform <ul> into <ol>
    // A node can be modified and passed to the convertNodeToElement function which will continue to render it and it's children
    if (node.type === "tag" && node.name === "ul") {
      node.name = "ul"
      return convertNodeToElement(node, index, transform);
    }
  
    // return an <i> element for every <b>
    // a key must be included for all elements
    //if (node.type === "tag" && node.name === "b") {
     // return <i key={index}>{processNodes(node.children, transform)}</i>
    //}
  
    // all links must open in a new window
    if (node.type === "tag" && node.name === "a") {
      node.attribs.target = "_blank";
      // console.log(node);
      // console.log(index);
      return convertNodeToElement(node, index, transform)
    }
  
    if (node.type === "tag" && node.name === "box") {
        return (
          <Box sx={{
            width: node.attribs.width,
            height: node.attribs.height,
            color: node.attribs.color,
            backgroundColor: node.attribs.bgcolor,
            padding: node.attribs.padding,
            textAlign: node.attribs.textalign,
            //'&:hover': {
            //    backgroundColor: 'primary.main',
            //    opacity: [0.9, 0.8, 0.7],
            //  },
          }} key={index}>
            {processNodes(node.children, transform)}
          </Box>
        )
    }

    /*
    if (node.type === "tag" && node.name === "divider") {
      return (
        <Divider />        
      )
    }
    */

    if (node.type === "tag" && node.name === "button") {
      return (
        <Button variant="contained" href={(node.attribs.href) ? node.attribs.href : '#'} key={index}>
          {processNodes(node.children, transform)}
        </Button>
      )
    }

    if (node.type === "tag" && node.name === "grid") {
        return (
          <Grid container spacing={node.attribs.spacing} key={index}>
            {processNodes(node.children, transform)}
          </Grid>
        )
    }

    if (node.type === "tag" && node.name === "griditem") {
        // remove {}
        if (node.attribs.xs && (node.attribs.xs.includes('{') && node.attribs.xs.includes('}'))) {
          node.attribs.xs = node.attribs.xs.replace('{', '')
          node.attribs.xs = node.attribs.xs.replace('}', '')
        }

        return (
          <Grid item xs={node.attribs.xs} key={index}>
            {processNodes(node.children, transform)}
          </Grid>
        )
    }

    if (node.type === "tag" && node.name === "h1") {
        return (
          <Typography variant="h1" component="h1" textAlign={node.attribs.textalign ? node.attribs.textalign : "left" } color={(node.attribs.color) ? node.attribs.color : 'text.light' } sx={{
            fontFamily: (node.attribs.fontfamily) ? node.attribs.fontfamily : 'Roboto-Bold'
          }} key={index}>
            {processNodes(node.children, transform)}
          </Typography>
        )
    }

    if (node.type === "tag" && node.name === "h2") {
        return (
          <Typography variant="h2" component="h2" textAlign={node.attribs.textalign ? node.attribs.textalign : "left" } color={(node.attribs.color) ? node.attribs.color : 'text.light' } key={index}>
            {processNodes(node.children, transform)}
          </Typography>
        )
    }

    if (node.type === "tag" && node.name === "h3") {
        return (
          <Typography variant="h3" component="h3" textAlign={node.attribs.textalign ? node.attribs.textalign : "left" } color={(node.attribs.color) ? node.attribs.color : 'text.light' } key={index}>
            {processNodes(node.children, transform)}
          </Typography>
        )
    }

    /* BUG - For some reason when this is enabled; nothing after TextField gets rendered...
    */
    if (node.type === "tag" && node.name === "textfield") {
      
      return (
          <Box component="form" sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }} noValidate autoComplete="off" key={index}>
            <div>
              <TextField id={"textfield_"+node.attribs.label} variant={(node.attribs.variant) ? node.attribs.variant : 'outlined'} label={(node.attribs.label) ? node.attribs.label : 'No Label'} />
            </div>
          </Box>
        )
      
    }
}

const options = {
    decodeEntities: true,
    transform
}

export default class PageContent extends React.Component {
    state = {
        pages: []
    }
    
    componentDidMount() {
        var pageIdSlug = this.props.page.toLowerCase()
        //console.log(pageSlug)

        axios.get(`http://localhost:5001/api/v1/page/${pageIdSlug}`)
        .then(res => {
        const pages = res.data;
        this.setState({ pages });
        })
    }
    
    render() {
        return (
            <Box component="div" sx={{
                width: '100%',
                height: '100vh',
                //'&:hover': {
                //    backgroundColor: 'primary.main',
                //    opacity: [0.9, 0.8, 0.7]
                //}
            }}>
            {
                this.state.pages
                .map(page =>
                    <div key={page._id}>
                    {
                        <>
                            { 
                                ReactHtmlParser(page.body, options)
                            }

                            
                        </>
                    }
                    </div>
                )
            }
            </Box>
        )
    }
}