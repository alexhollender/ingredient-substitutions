import parse from 'html-react-parser';
import './scss/SubstituteItem.scss';

function SubstituteItem({ substituteName, proportion, note, score, index }) {

  // function increaseScore(e) {
  //   let substitutesObj = obj
  //   const curSubIndex = e.currentTarget.dataset.index
  //   substitutesObj[curSubIndex].score++
  //
  //   searchIndex.partialUpdateObject({
  //     substitutes: substitutesObj,
  //     objectID: '1ee2caf1450a1a_dashboard_generated_id'
  //   }).then(({ objectID }) => {
  //     console.log(objectID);
  //   });
  // }

  function formatName(string) {
    return string.charAt(0).toUpperCase() + string
    .slice(1)
    .replaceAll('(', '<span>(')
    .replaceAll(')', ')</span>')
  }

  return (
    <li className="SubstituteItem" data-index={index}>
      {/* parse substituteName b/c sometimes it has <span> elements in it */}
      <p className="name font-substitute">{parse(formatName(substituteName))}</p>
      {proportion ? <p className="proportion font-note">{proportion}</p> : null}
      {note ? <p className="note font-note">{note}</p> : null}
    </li>
  )
}

export default SubstituteItem;
