import { createTheme } from "@mui/material";

export default createTheme({
    palette: {
        primary: {
            main: "#272640",
        },
        secondary: {
            main: "#065A60"
        },
        text: {
            light: "#f5f5f5",
            primary: "#006466"
        }
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    padding: 0,
                }
            }
        },
        MuiButton: {
            defaultProps: {
                size: "small",
                variant: "contained",
            },
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    color: '#fff'
                }
            }
        },
        MuiCard: {
            variants:[
                {
                    props: {variant: 'shaded'},
                    style: {
                        backgroundColor: "#E0E0D9", 
                        borderRadius: '10px',
                    }
                }
            ]
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    color: '#fff'
                }
            }
        },
        MuiInput: {
            root: {
                border: '1px solid #fff'
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#fff'
                }
            }
        },
        MuiList: {
            styleOverrides: {
                root: {
                    backgroundColor: '#051923'
                }
            }
        },
        MuiListItemText: {
            styleOverrides: {
                root: {
                    color: '#90E0EF'
                }
            }
        },        
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: '#00B4D8',
                    border: '1px solid #CAF0F8',
                    color: '#000'
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root:{
                    padding: 0,
                    backgroundColor: '#051923'
                }
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: '#00a6fb',
                    borderRadius: '50%',
                }
            }
        },
        MuiTextField: {
            defaultProps: {
                size: "small",
                variant: "outlined",
                margin: "normal",
                fullWidth: true,
                /*InputLabelProps: {
                    shrink: true,
                    color: 'primary'
                }*/
            }
        },
        MuiTypography:{
            defaultProps: {
                align: 'left'
            }
        },
    }
})