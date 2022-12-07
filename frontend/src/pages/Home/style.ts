import styled, { keyframes } from 'styled-components'


const animateMenuOpen = keyframes`
    
    from {

        width: 4em;
    }
    to {

        width: 18%;
    }
`
const animateMenuClose = keyframes`
    
    from {
        width: 18%;
    } 
    to {
    
        width: 4em;
    }
`

const Container = styled.div`

    .headerStyle {

        position: fixed;
        height: 72px;
        width: 100%;
        background: var(--color);
        box-shadow: 0px 0px 40px -18px var(--color-box-shadow-header);
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;

        color: var(--background);

        button.b-menu {
            border: 0;
            background: var(--transparent);

            img{
                width: 2em;
            }
        }
    }
`

const Content = styled.main`

    padding-top: 72px;

    display: flex;
    height: 100vh;

    nav.open {
        height: 100%;
        width: 18%;
        background: var(--background-side-menu);
        animation: ${ animateMenuOpen } 1s ease-out;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
        .divNav {

            & > div {
                padding: 20px 10px;
                cursor: pointer;

                padding-left: 25px;
                font-size: 20px;
                color: var(--background);

                display: flex;

                :hover {
                    background: var(--color);
                }

                img {
                    padding-right: 15px;
                }
            }
        }

        .divLogOut {

            box-shadow: var(--background) 0 0.5px 0 0 inset;

            padding: 20px 10px;
            cursor: pointer;

            padding-left: 25px;
            font-size: 20px;
            color: var(--background);

            display: flex;
            justify-content: center;

            :hover {
                background: var(--color);
            }

            img {
                padding-left: 15px;
            }
        }

        @media (max-width: 1024px) {

            display: none;
        }
    }
    
    nav.close {
        height: 100%;
        min-width: 4em;
        background: var(--color);
        animation: ${ animateMenuClose } .5s ease-out;
    
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .divNav {

            & > div {
                
                display: flex;
                padding: 20px 0;
                cursor: pointer;

                padding-left: 20px;
                font-size: 20px;
                
                p {
                    display: none;
                }

                :hover {
                    background: var(--color);
                }

                img {
                    height: 1.2em;
                }   
            }
        }

        .divLogOut {

            display: flex;
            padding: 20px 0;
            cursor: pointer;

            padding-left: 20px;
            font-size: 20px;
            
            p {
                display: none;
            }

            :hover {
                background: var(--color);
            }

            img {
                height: 1.2em;
            }
        }

        @media (max-width: 1024px) {

            animation: unset;
        }
    }

    & > div {
        width: 100%;
        overflow: auto;

        ::-webkit-scrollbar {
            width: 10px;
        }

        ::-webkit-scrollbar-thumb {
            background: var(--transparent);
        }
    }
`

export { Container, Content }