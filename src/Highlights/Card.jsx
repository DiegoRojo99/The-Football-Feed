import './Highlights.css';

export default function HighlightsCard({highlight}){
  console.log("H: ", highlight)
  return (
    <div className="highlight-item">
      <div className='highlight-game-info'>
        <p className='game-info-title'>{highlight.title}</p>
      </div>
      {
        highlight.videos?.length > 1 ?
          <div className="long-highlight-video" dangerouslySetInnerHTML={{ __html: extractIframe(highlight.embed) }} />   
        :
          <div className="highlight-video" dangerouslySetInnerHTML={{ __html: extractIframe(highlight.embed) }} /> 
      }
    </div>
  )
}

function extractIframe(embedString) {
  const regex = /<iframe.*?<\/iframe>/;
  const match = embedString.match(regex);
  return match ? match[0] : '';
}
