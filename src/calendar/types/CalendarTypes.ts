export interface IBigCalendarEvent {
  id?: string | number;
  title: string;
  start: Date;
  end: Date;
  notes: string;
  bgcolor?: string;
  user?: {
    _id: string;
    name: string;
  };
}

export interface ICalendarModalEvent {
  event: IBigCalendarEvent;
}

export interface IGetEvents {
  data: {
    ok: boolean;
    events: IBigCalendarEvent[];
  };
}
