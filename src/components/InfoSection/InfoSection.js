// InfoSection.js
import React from 'react';
import { InfoSec, InfoRow, InfoColumn, TextWrapper, TopLine, Heading, Subtitle, ImgWrapper, Img } from './InfoSection.elements';
import { Container, Button } from '../../globalStyles';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import SignupPage from '../../pages/SignUp/SignupPage';

const InfoSection = ({
    primary,
    lightBg,
    topLine,
    lightTopLine,
    lightText,
    lightTextDesc,
    headline,
    description,
    buttonLabel,
    img,
    alt,
    imgStart,
    start,
}) => {
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleButtonClick = () => {
        // Navigate to the signup page
        navigate('/signup-page');
    };

    return (
        <InfoSec lightBg={lightBg}>
            <Container>
                <InfoRow imgStart={imgStart}>
                    <InfoColumn>
                        <TextWrapper>
                            <TopLine lightTopLine={lightTopLine}>{topLine}</TopLine>
                            <Heading lightText={lightText}>{headline}</Heading>
                            <Subtitle lightTextDesc={lightTextDesc}>{description}</Subtitle>
                            <Button big fontBig primary={primary} onClick={handleButtonClick}>
                                {buttonLabel}
                            </Button>
                        </TextWrapper>
                    </InfoColumn>
                    <InfoColumn>
                        <ImgWrapper start={start}>
                            <Img src={img} alt={alt} />
                        </ImgWrapper>
                    </InfoColumn>
                </InfoRow>
            </Container>
        </InfoSec>
    );
};

export default InfoSection;
