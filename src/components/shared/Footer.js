import styled from "styled-components";

export default function Footer({filmImage, filmName, weekday, time}) {
    const hasDate = (weekday !== undefined && time !== undefined);
    const when = weekday + " - " + time;

    return (
        <Style>
            <div>
                <img src={filmImage} width="48" height="72" alt="film poster" />
            </div>
            <div>
                {filmName}<br/>
                {hasDate? when: null}
            </div>
        </Style>
    )
}

const Style = styled.div`
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 116px;
    border-top: 1px solid #9EADBA;
    background-color: #DFE6ED;
    display: flex;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
    font-size: 26px;

    div:first-child {
        padding: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        background-color: white;
    }

    div:last-child {
        margin-left: 14px;
    }
`;