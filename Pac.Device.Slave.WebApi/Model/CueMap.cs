using System.Xml.Serialization;

namespace Pac.Device.Slave.WebApi.Model;

[XmlType ( "Map" )]
public class CueMap
{
    [XmlAttribute] public int Len { get; set; }
    [XmlElement( "Cue" )] public List<Cue>? Items { get; set; }
    public CueMap() { }

    public CueMap( List<Cue> items )
    {
        Items = items;
        Len = items.Count;
    }
}